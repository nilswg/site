export async function lineNotify(token: string, message: FormData) {
    return fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: message,
    }).then((resp) => resp.json());
}