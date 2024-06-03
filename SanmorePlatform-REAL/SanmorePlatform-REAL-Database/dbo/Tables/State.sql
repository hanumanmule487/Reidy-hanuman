CREATE TABLE [dbo].[State] (
    [StateId]   INT            IDENTITY (1, 1) NOT NULL,
    [ShortName] NVARCHAR (MAX) NOT NULL,
    [LongName]  NVARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_State] PRIMARY KEY CLUSTERED ([StateId] ASC)
);

