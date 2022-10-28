import { Workbook, Row, TableColumnProperties } from 'exceljs';

async function createAndFillWorkbook() {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('TODO Month computed');

  worksheet.mergeCells('B1:C1');
  worksheet.mergeCells('B2:C2');
  worksheet.mergeCells('D1:D2');
  worksheet.mergeCells('E1:E2');
  worksheet.getCell('B1').value = 'NOM: de Tocqueville';
  worksheet.getCell('B2').value = 'PRENOM: Alexandre';
  worksheet.getCell('D1').value = 'CLIENT: Padoa';
  worksheet.getCell('B2').value = 'MOIS: Test';

  worksheet.getRow(1).height = 30;
  worksheet.getRow(2).height = 30;

  // const rows = [
  //   {id: 1, name: 'fdffe', age: 25},
  //   {id:6, name: 'Barbara', age: new Date()}
  // ];

  // worksheet.addRows(rows);
  // worksheet.addRow({});

  // add a table to a sheet
  worksheet.addTable({
    name: 'MyTable',
    ref: 'B3',
    headerRow: true,
    totalsRow: true,
    style: {
      showRowStripes: false,
    },
    columns: [
      { name: 'Date', totalsRowLabel: 'Totals:' },
      { name: 'Amount', totalsRowFunction: 'sum' },
    ],
    rows: [
      [new Date('2019-07-20'), 70.1],
      [new Date('2019-07-21'), 70.6],
      [new Date('2019-07-22'), 70.1],
    ],
  });

  await workbook.xlsx.writeFile('test.xlsx');
}

createAndFillWorkbook();
