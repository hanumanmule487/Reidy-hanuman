CREATE TABLE [dbo].[Borrowers] (
    [BorrowerId]         INT            IDENTITY (1, 1) NOT NULL,
    [SSN]                NVARCHAR (MAX) NOT NULL,
    [Dob]                DATETIME2 (7)  NOT NULL,
    [MaritalStatus]      NVARCHAR (MAX) NULL,
    [WorkHistory]        NVARCHAR (MAX) NULL,
    [PasspoprtID]        INT            NOT NULL,
    [FinancialStatement] NVARCHAR (MAX) NULL,
    [BankStatement]      NVARCHAR (MAX) NULL,
    [LLCDocuments]       NVARCHAR (MAX) NULL,
    [CreditScore]        INT            NOT NULL,
    [RealState]          REAL           NOT NULL,
    [UserAgreement]      BIT            NOT NULL,
    CONSTRAINT [PK_Borrowers] PRIMARY KEY CLUSTERED ([BorrowerId] ASC)
);

