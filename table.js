module.exports = {
    getTable: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<table ${attr}>${string}</table>`;
    },
    getTHead: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<thead ${attr}>${string}</thead>`;
    },
    getTBody: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<tbody ${attr}>${string}</tbody>`;
    },
    getTh: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<th ${attr}>${string}</th>`;
    },
    getTr: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<tr ${attr}>${string}</tr>`;
    },
    getTd: function(string, attr = null){
        attr = attr == null ? '' : attr;
        return `<td ${attr}>${string}</td>`;
    }
}