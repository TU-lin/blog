function serializeArrayisJson(form) {
    var result = {};
    const f = form.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value;
    });
    return result;
};