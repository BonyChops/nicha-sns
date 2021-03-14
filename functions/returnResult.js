const mesDefine = {
    400: { type: "bad_request", mes: "Please check api docs. https://github.com/BonyChops/nicha-sns/blob/main/functions/docs/v1.md" },
    401: { type: "not_authorized", mes: "Not authorized." },
    404: { type: "not_found", mes: "Endpoint not found...(nicha" },
    409: { type: "conflict", mes: "Conflicted request." },
    418: { type: "I_am_a_teapot", mes: "Failed to brew coffee with a teapot. " },
    503: { type: "service_unavailable", mes: "Service Unavailable. This means server's error(not the client). Could you contact the owner of this service: nicha? Thanks for your support." }
}

const error = (res, statusCode, type = false, mes = false, detail = false) => {
    const defaultMes = "Unknown error was occurred...";
    const defaultType = "unknown_error";
    res.status(statusCode);
    const errData = {
        status: "error",
        code: statusCode,
        type: ((v, v2) => (v === undefined ? v2 : v))(mesDefine[statusCode]?.type, defaultType) + (!type ? "" : `_${type}`),
        mes: !mes ? ((v, v2) => (v === undefined ? v2 : v))(mesDefine[statusCode]?.mes, defaultMes) : mes
    }
    errData.detail = detail;
    res.send(errData)
}
exports.error = error;

exports.success = (res, data = false, statusCode = 200) => {
    if (data === false) {
        res.status(204);
        res.send();
        return;
    };
    res.status(statusCode);
    data.status = "ok";
    res.send(data);
}

exports.checkParams = (req, res, required) => {
    const body = req.body;
    const result = required.some(param => body[param] !== undefined);
    if (!result) {
        error(res, 400);
        return false;
    }
    return true;
}