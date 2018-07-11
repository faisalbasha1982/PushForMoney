export const ObjectToQueryString = obj => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join("&");
  };
  
  export const FileExtension = filename => {
    return filename.split(".").pop();
  };
  