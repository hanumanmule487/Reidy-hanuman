CREATE TABLE [dbo].[PropertyVideo] (
    [PropertyVideoId] INT            IDENTITY (1, 1) NOT NULL,
    [VideoName]       NVARCHAR (MAX) NULL,
    [VideoPath]       NVARCHAR (MAX) NULL,
    [PropertyId]      INT            NOT NULL,
    CONSTRAINT [PK_PropertyVideo] PRIMARY KEY CLUSTERED ([PropertyVideoId] ASC)
);

