"use strict";
exports.__esModule = true;
exports.LoaderHOC = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Loading_1 = require("../../components/Loading");
exports.LoaderHOC = function () {
    var location = react_router_dom_1.useLocation();
    var afterComponent = function (Component) {
        return Component;
    };
    var preloadComponent = function (_) {
        return Loading_1.Loading;
    };
    react_1.useEffect(function () {
        setResultType("LOADER");
        resetTimeout();
    }, [location.pathname]);
    var _a = react_1.useState("LOADER"), resultType = _a[0], setResultType = _a[1];
    var resetTimeout = function () {
        setTimeout(function () {
            setResultType("COMPONENT");
        }, 2000);
    };
    resetTimeout();
    switch (resultType) {
        case "LOADER":
            return preloadComponent;
        case "COMPONENT":
            return afterComponent;
        default:
            return preloadComponent;
    }
};
