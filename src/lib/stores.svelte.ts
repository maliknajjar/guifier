export const websiteStore = $state({
    backgroundColor: "rgba(255, 255, 0, 1)",
    borderColor: "rgba(230, 230, 0, 1)",
})

export function setWebsiteColor(type: "json" | "yaml" | "xml" | "toml") {
    if (type === 'json') {
        websiteStore.backgroundColor = "rgba(255, 255, 0, 1)";
        websiteStore.borderColor = "rgba(230, 230, 0, 1)";
    } else if (type === 'yaml') {
        websiteStore.backgroundColor = 'rgba(0, 0, 255, 0.25)';
        websiteStore.borderColor = 'rgba(0, 0, 220, 0.15)';
    } else if (type === 'xml') {
        websiteStore.backgroundColor = 'rgba(255, 166, 0, 0.25)';
        websiteStore.borderColor = 'rgba(230, 150, 0, 0.2)';
    } else if (type === 'toml') {
        websiteStore.backgroundColor = 'rgba(0, 128, 0, 0.25)';
        websiteStore.borderColor = 'rgba(0, 110, 0, 0.15)';
    }
}
