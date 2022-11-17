export const disablePageScroll = () => {
  document.body.style.overflow = "hidden";
};
export const enablePageScroll = () => {
  document.body.style.overflow = "unset";
};

export const actOnEscapeKeydown = (act: () => void, enable: boolean) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      act();
    }
  };

  if (enable) {
    window.addEventListener("keydown", onKeyDown);
  } else {
    window.removeEventListener("keydown", onKeyDown);
  }
};
