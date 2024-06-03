CREATE TABLE [dbo].[PropertyImage] (
    [PropertyImageId] INT            IDENTITY (1, 1) NOT NULL,
    [ImageName]       NVARCHAR (MAX) NULL,
    [ImagePath]       NVARCHAR (MAX) NULL,
    [PropertyId]      INT            NOT NULL,
    CONSTRAINT [PK_PropertyImage] PRIMARY KEY CLUSTERED ([PropertyImageId] ASC)
);

