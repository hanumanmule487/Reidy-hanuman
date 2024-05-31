CREATE TABLE [dbo].[DueDiligenceDocument] (
    [DueDiligenceDocumentId] INT            IDENTITY (1, 1) NOT NULL,
    [FileName]               NVARCHAR (MAX) NULL,
    [FilePath]               NVARCHAR (MAX) NULL,
    [FileType]               INT            NOT NULL,
    [PropertyId]             INT            NOT NULL,
    CONSTRAINT [PK_DueDiligenceDocument] PRIMARY KEY CLUSTERED ([DueDiligenceDocumentId] ASC)
);

