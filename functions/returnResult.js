const mesDefine = {
    401: "Not authorized.",
    404: "Endpoint not found...(nicha"
}

exports.error = (res, statusCode, mes = false) => {
    const defaultMes = "Unknown error was occurred...";
    res.status(statusCode);
    res.send({
        status: "error",
        mes: mesDefine[statusCode] === undefined ? defaultMes : mesDefine[statusCode]
    })
}