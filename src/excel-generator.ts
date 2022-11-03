import { Workbook } from 'exceljs';
import { getMonth, getRows, getWSName, findDaysInMonth } from './date-manager';

export async function createAndFillWorkbook({firstName, lastName, clientName}) {
  const monthComputed: string = await getMonth();
  const rows = getRows(monthComputed);
  const worksheetName = getWSName(monthComputed);
  const daysInMonth = findDaysInMonth(monthComputed);

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(worksheetName);

  worksheet.mergeCells('B1:C1');
  worksheet.mergeCells('B2:C2');
  worksheet.mergeCells('D1:D2');
  worksheet.mergeCells('E1:E2');
  worksheet.getCell('B1').value = `NOM: ${lastName}`;
  worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('B2').value = `PRENOM: ${firstName}`;
  worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('D1').value = `CLIENT: ${clientName}`;
  worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('E1').value = `MOIS: ${worksheetName}`;
  worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.getRow(1).height = 30;
  worksheet.getRow(2).height = 30;

  worksheet.getColumn(2).width = 11;
  worksheet.getColumn(3).width = 11;
  worksheet.getColumn(4).width = 22;
  worksheet.getColumn(5).width = 22;

  worksheet.addTable({
    name: 'MyTable',
    ref: 'B3',
    headerRow: true,
    style: {
      showRowStripes: false,
    },
    columns: [
      { name: 'Date' },
      { name: 'Jour' },
      { name: 'Présence' },
      { name: 'Absence' },
    ],
    rows,
  });

  const fileName = `CRA-2022-${monthComputed}.xlsx`;
  await workbook.xlsx.writeFile('generated/' + fileName);
  return fileName;
}
