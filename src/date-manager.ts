import readline from 'readline';
import { parse, getDaysInMonth, addDays, format, setDefaultOptions } from 'date-fns';
import { fr } from 'date-fns/locale';
setDefaultOptions({ locale: fr });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask (question): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

function monthNumberToDate(month: string): Date {
  const yesterdayOfMonthChosen = parse(month, 'M', new Date());
  const userTimezoneOffset = yesterdayOfMonthChosen.getTimezoneOffset() * 60000;
  return new Date(yesterdayOfMonthChosen.getTime() - userTimezoneOffset);
}

export function findDaysInMonth(month: string) {
  const firstDayOfMonth: Date = monthNumberToDate(month)
  return getDaysInMonth(firstDayOfMonth);
}

export async function getMonth(): Promise<string> {
  const monthInNumber: string = await ask('Quel mois? ');
  rl.close();

  return monthInNumber;
}

export function getRows(monthComputed) {
  const firstDayOfMonth: Date = monthNumberToDate(monthComputed)

  const daysInMonth = getDaysInMonth(firstDayOfMonth);
  const daysComputed: Date[] = [];

  for(let i = 0; i < daysInMonth; i++) {
    let newDay = addDays(firstDayOfMonth, i);
    daysComputed.push(newDay)
  }

  return daysComputed.map(day => {
    return [
      format(day, 'dd/MM'),
      format(day, 'eeeee'),
      1,
      0
    ]
  })
}
 export function getWSName(monthComputed): string {
  const firstDayOfMonth: Date = monthNumberToDate(monthComputed)
  return format(firstDayOfMonth, 'MMMM Y')
 }
