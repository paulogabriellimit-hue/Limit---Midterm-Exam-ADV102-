import { loadData, saveData } from "./storage";
import { BorrowedCD, CD, Stats } from "./types";

export const borrowCD = async (cdId: string, borrower: string) => {
  const cds: CD[] = (await loadData("cds")) || [];
  const borrowed: BorrowedCD[] = (await loadData("borrowed")) || [];

  const cd = cds.find((c) => c.id === cdId);
  if (!cd || cd.copies <= 0) {
    alert("CD not available.");
    return;
  }

  cd.copies -= 1;
  const borrowDate = new Date();
  const dueDate = new Date(borrowDate);
  dueDate.setDate(borrowDate.getDate() + 7);

  borrowed.push({
    id: Date.now().toString(),
    cdId,
    borrower,
    borrowDate: borrowDate.toISOString(),
    dueDate: dueDate.toISOString(),
    penalty: 0,
  });

  await saveData("cds", cds);
  await saveData("borrowed", borrowed);
};

export const returnCD = async (borrowId: string) => {
  const cds: CD[] = (await loadData("cds")) || [];
  const borrowed: BorrowedCD[] = (await loadData("borrowed")) || [];
  const stats: Stats = (await loadData("stats")) || {
    income: 0,
    totalBorrowed: 0,
  };

  const record = borrowed.find((b) => b.id === borrowId);
  if (!record) return;

  const cd = cds.find((c) => c.id === record.cdId);
  if (cd) cd.copies += 1;

  const today = new Date();
  const due = new Date(record.dueDate);
  let penalty = 0;
  if (today > due) {
    const daysOverdue = Math.floor(
      (today.getTime() - due.getTime())
    );
    penalty = daysOverdue * 2;
  }

  stats.income += penalty;
  stats.totalBorrowed += 1;

  const updatedBorrowed = borrowed.filter((b) => b.id !== borrowId);

  await saveData("cds", cds);
  await saveData("borrowed", updatedBorrowed);
  await saveData("stats", stats);
};
