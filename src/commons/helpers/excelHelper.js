import XLSX from 'xlsx';
import FileSaver from 'file-saver';

const getExportItems = (items, exportColumns) => {
    if (!items || !exportColumns) return null;

    return items.map(item => {
        const exportItem = {};
        exportColumns.forEach(col => {
            if (col.isExport !== false) {
                let exportValue = item[col.field];
                if (col.exportValue) {
                    if (typeof col.exportValue === 'function') {
                        exportValue = col.exportValue(exportValue, item);
                    } else {
                        ({ exportValue } = col);
                    }
                }
                exportItem[col.headerName] = exportValue;
            }
        });
        return exportItem;
    });
};

export const saveAs = (csv, fileName) => {
    FileSaver.saveAs(new Blob([csv], { type: 'application/octet-stream' }), `${fileName}.csv`);
};

export const exportCsv = (items, gridColumns, fileName) => {
    const exportItems = getExportItems(items, gridColumns);
    const ws = XLSX.utils.json_to_sheet(exportItems);
    const csv = XLSX.utils.sheet_to_csv(ws);
    saveAs(csv, fileName);
};

export const exportExcel = (items, gridColumns, fileName, sheetName, isXlsx) => {
    const exportItems = getExportItems(items, gridColumns);
    console.log('isXlsx = ', isXlsx);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportItems);
    XLSX.utils.book_append_sheet(wb, ws, sheetName || fileName);
    XLSX.writeFile(wb, `${fileName}.${isXlsx ? 'xlsx' : 'xls'}`);
};

// export const exportGridParams = {
//     rowIndex: 0,
//     pageSize: 2147483647,
//     targetFields: '',
//     descs: false,
// };
