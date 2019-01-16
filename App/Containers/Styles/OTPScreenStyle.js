import { StyleSheet } from "react-native";
import { ApplicationStyles, Fonts, Metrics, Colors } from "../../Themes/";

export default StyleSheet.create({
  mainContainer: {
    padding: Metrics.doubleBaseMargin,
    backgroundColor: Colors.snow,
    height: Metrics.screenHeight,
    justifyContent: "flex-start"
  },
  container: {
    height: "60%",
    flexDirection: "column"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  iconContainer: {
    flex: 1
  },
  arrowIcon: {
    color: Colors.burntSienna
  },
  headerTitle: {
    flex: 9
  },
  textContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: Metrics.doubleBaseMargin
  },
  titleText: {
    ...Fonts.style.normalLight,
    color: Colors.drawer,
    fontSize: Fonts.size.regular,
    fontWeight: '400'
  },
  bodyText: {
    ...Fonts.style.normal,
    width: '90%',
    fontFamily: Fonts.type.openSans_light,
    marginTop: Metrics.baseMargin,
    marginBottom: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.small,
    color: Colors.drawer
  },
  numberText: {
    ...Fonts.style.normal,
    fontFamily: Fonts.type.openSans_light,
    fontSize: Fonts.size.small - 1,
    color: Colors.drawer
  },
  editText: {
    ...Fonts.style.normalLight,
    fontSize: Fonts.size.small,
    color: Colors.burntSienna
  },
  formContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  submitButton: {
    marginVertical: Metrics.baseMargin,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.burntSienna
  },
  bottomContainer: {
    marginVertical: Metrics.baseMargin,
    flexDirection: 'row',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  bottomText: {
    ...Fonts.style.normalLight,
    color: Colors.drawer,
    marginRight: Metrics.baseMargin,
    fontSize: Fonts.size.small
  },
  resendContainer: {
  },
  resendText: {
    ...Fonts.style.normalLight,
    fontSize: Fonts.size.medium,
    color: Colors.burntSienna,
    textAlign: "left"
  }
});
