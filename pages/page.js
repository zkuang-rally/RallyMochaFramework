class Page {
    open(url) {
        browser.url(url);
        browser.maximizeWindow();
    }

    moveToTab(url) {
        browser.switchWindow(url);
    }
}
module.exports = new Page();
