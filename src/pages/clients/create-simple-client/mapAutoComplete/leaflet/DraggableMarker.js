/* eslint-disable react/prop-types */

import { useCallback, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setLat, setLng } from "reduxToolkit/mapAutocomplete";

export function DraggableMarker() {
  const dispatch = useDispatch();
  const { lat, lng } = useSelector((store) => store.mapAutocomplete);
  const [draggable, setDraggable] = useState(false);

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const res = marker.getLatLng();
          dispatch(setLat(res.lat));
          dispatch(setLng(res.lng));
        }
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={{ lat, lng }}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Puedes arrastrar el marcador"
            : "Click aquí para arrastrar el marcador"}
        </span>
      </Popup>
    </Marker>
  );
}
