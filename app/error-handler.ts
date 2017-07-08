export function errorHandler() {
    return (k, next) => next()
        .then(() => {
            if (k.body === undefined && k.request.method !== 'OPTIONS') {
                k.status = 404;
                k.body = 'NOT_FOUND';
            }
        })
        .catch(err => {
            console.error(err);
            k.status = err.status || 500;
            k.body = {
                status: k.status,
                message: err.message,
            };
        });
}
