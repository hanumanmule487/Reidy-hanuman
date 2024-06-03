CREATE TABLE [dbo].[Link] (
    [LinkId]     INT            IDENTITY (1, 1) NOT NULL,
    [LinkName]   NVARCHAR (MAX) NULL,
    [PropertyId] INT            NOT NULL,
    CONSTRAINT [PK_Link] PRIMARY KEY CLUSTERED ([LinkId] ASC)
);

