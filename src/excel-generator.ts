import { Workbook, Row, TableColumnProperties } from 'exceljs';
import { startOfMonth, parse, addDays } from 'date-fns';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask (question): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function getMonth(): Promise<string> {
  const monthInNumber: string = await ask('Quel mois? ');
  rl.close();

  return monthInNumber;
}

function monthNumberToDate(month: string): Date {
  const yesterdayOfMonthChosen = parse(month, 'M', new Date());
  const userTimezoneOffset = yesterdayOfMonthChosen.getTimezoneOffset() * 60000;
  const dayWithoutOffset = new Date(yesterdayOfMonthChosen.getTime() - userTimezoneOffset);

  return dayWithoutOffset;
}

async function createAndFillWorkbook() {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('TODO Month computed');

  worksheet.mergeCells('B1:C1');
  worksheet.mergeCells('B2:C2');
  worksheet.mergeCells('D1:D2');
  worksheet.mergeCells('E1:E2');
  worksheet.getCell('B1').value = 'NOM: de Tocqueville';
  worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('B2').value = 'PRENOM: Alexandre';
  worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('D1').value = 'CLIENT: Padoa';
  worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
  worksheet.getCell('E1').value = 'MOIS: Test';
  worksheet.getCell('E1').alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.getRow(1).height = 30;
  worksheet.getRow(2).height = 30;

  worksheet.getColumn(2).width = 15;
  worksheet.getColumn(3).width = 15;
  worksheet.getColumn(4).width = 30;
  worksheet.getColumn(5).width = 30;

  const monthComputed = await getMonth();
  const firstDayOfMonth = monthNumberToDate(monthComputed)

  console.log(firstDayOfMonth)

  // add a table to a sheet
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
    rows: [
      [new Date('2019-07-20'), 70.1],
      [new Date('2019-07-21'), 70.6],
      [new Date('2019-07-22'), 70.1],
    ],
  });

  await workbook.xlsx.writeFile(`CRA-2022-${monthComputed}.xlsx`);
}

createAndFillWorkbook();
