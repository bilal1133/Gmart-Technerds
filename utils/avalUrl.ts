

export default function avalUrl(image_url: string) {
    let index = image_url.indexOf("public");
    let url = image_url.substr((index + 6));

    return url;
}