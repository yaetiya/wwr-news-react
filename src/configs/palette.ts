// export const defaultBackgroundColor = "#EDF2F4";
// export const defaultTextColor = "#2B2D42";
// export const secondaryBackgroundColor = "#EF233C";
// export const secondaryTextColor = "#8D99AE";
// export const primaryDarkColor = "#D90429";

export const defaultBackgroundColor = "#FFFFFF";
export const defaultTextColor = "#2B2D42";
export const secondaryBackgroundColor = "#0500FF";
export const secondaryTextColor = "#8D99AE";
export const primaryDarkColor = "#D90429";
export const defaultErrorColor = "#EF233C";

export const alertsStyle = (isSuccess : boolean) => {
  return {
    borderRadius: 0,
    color: defaultBackgroundColor,
    background: isSuccess ? secondaryBackgroundColor : defaultErrorColor,
  };
};
