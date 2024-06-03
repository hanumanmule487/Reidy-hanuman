CREATE TABLE [dbo].[Brokers] (
    [BrokerId]                 INT            IDENTITY (1, 1) NOT NULL,
    [IdentityFile]             NVARCHAR (MAX) NOT NULL,
    [RelationWithPropertyFile] NVARCHAR (MAX) NOT NULL,
    [ContractFile]             NVARCHAR (MAX) NOT NULL,
    [DeedForOwner]             NVARCHAR (MAX) NOT NULL,
    [PicturesFile]             NVARCHAR (MAX) NULL,
    [AdditionalDocumentsFile]  NVARCHAR (MAX) NULL,
    [AcceptAgreement]          BIT            NOT NULL,
    CONSTRAINT [PK_Brokers] PRIMARY KEY CLUSTERED ([BrokerId] ASC)
);

