const mesDefine = {
    401: { type: "not_authorized", mes: "Not authorized." },
    404: { type: "not_found", mes: "Endpoint not found...(nicha" },
    503: { type: "service_unavailable_timedout", mes: "Service Unavailable. This means server's error(not the client). Could you contact the owner of this service: nicha? Thanks for your support." }
}

exports.error = (res, statusCode, type = false, mes = false) => {
    const defaultMes = "Unknown error was occurred...";
    const defaultType = "unknown_error";
    res.status(statusCode);
    res.send({
        status: "error",
        code: statusCode,
        type: ((v, v2) => (v === undefined ? v2 : v))(mesDefine[statusCode].type, defaultType) + (!type ? "" : `_${type}`),
        mes: !mes ? ((v, v2) => (v === undefined ? v2 : v))(mesDefine[statusCode].mes, defaultMes) : mes
    })
}