CREATE TABLE [dbo].[UnitMix] (
    [UnitMixId]  INT             IDENTITY (1, 1) NOT NULL,
    [Beds]       INT             NOT NULL,
    [Units]      INT             NOT NULL,
    [Baths]      DECIMAL (18, 2) NULL,
    [UnitArea]   DECIMAL (18, 2) NULL,
    [AskingRent] DECIMAL (18, 2) NULL,
    [PropertyId] INT             NOT NULL,
    CONSTRAINT [PK_UnitMix] PRIMARY KEY CLUSTERED ([UnitMixId] ASC)
);

