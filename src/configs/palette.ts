// export const defaultBackgroundColor = "#EDF2F4";
// export const defaultTextColor = "#2B2D42";
// export const secondaryBackgroundColor = "#EF233C";
// export const secondaryTextColor = "#8D99AE";
// export const primaryDarkColor = "#D90429";

export const defaultBackgroundColor = "#FFFFFF";
export const defaultTextColor = "#2B2D42";
export const secondaryBackgroundColor = "#F1F1F1";
export const primaryColor = "#0500FF";
export const secondaryTextColor = "#8D99AE" ;
export const defaultErrorColor = "#EF233C";
export const primaryShadow = "0px 4px 10px rgba(5, 0, 255, 0.28)";
// export const secondaryPrimaryColor = "#0500FF";

export const alertsStyle = (isSuccess : boolean) => {
  return {
    borderRadius: 0,
    color: defaultBackgroundColor,
    background: isSuccess ? primaryColor : defaultErrorColor,
  };
};
