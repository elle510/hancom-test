export const moveLink = (history, pathname, search) => {
    if (window && window.event && window.event.ctrlKey) {
        const win = window.open(`${pathname}${search}`, '_blank');
        win.focus();
    } else {
        history.push({
            pathname,
            // state: { objectID: node.data.objectID },
            search,
        });
    }
};

export const test = () => {};
