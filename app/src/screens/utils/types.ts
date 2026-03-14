export type CD = {
  id: string;
  title: string;
  artist: string;
  copies: number;
};

export type BorrowedCD = {
  id: string;
  cdId: string;
  borrower: string;
  borrowDate: string;
  dueDate: string;
  penalty: number;
};

export type Stats = {
  income: number;
  totalBorrowed: number;
};
