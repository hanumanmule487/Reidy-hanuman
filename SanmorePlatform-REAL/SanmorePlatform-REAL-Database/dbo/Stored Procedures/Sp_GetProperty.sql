CREATE PROCEDURE [dbo].[Sp_GetProperty] --null, null, null, null, null, null, null, null, null, null
(
@propertyType nvarchar(max),
@status nvarchar(max),
@maxPrice nvarchar(max),
@minPrice nvarchar(max),
@minYearBuilt nvarchar(max),
@maxYearBuilt nvarchar(max),
--@minSquareFeet nvarchar(max),
--@maxSquareFeet nvarchar(max),
--@minFundsToClose nvarchar(max),
--@maxFundsToClose nvarchar(max),
--@minInterestRate nvarchar(max),
--@maxInterestRate nvarchar(max),
@minAcresLandSize nvarchar(max),
@maxAcresLandSize nvarchar(max),
@minBeds nvarchar(max),
@maxBeds nvarchar(max)
)
AS
BEGIN
SET NOCOUNT ON
 DECLARE      
              @sqlData NVARCHAR(MAX),
              @filter NVARCHAR(MAX),
              @totalRecords INT,
              @totalPages INT,
			  @all  VARCHAR(2)   = '-1',
			  @MinPriceFilter nvarchar(max),
			  @StatusFilter nvarchar(max),
			  @PropertyTypeFilter nvarchar(max),
			  @YearBuiltFilter nvarchar(max),
			  @minYearBuiltFilter nvarchar(max),
			  @LandSizeFilter nvarchar(max),
			  @MinLandSizeFilter nvarchar(max),
			  @BedsFilter nvarchar(max),
			  @MinBedsFilter nvarchar(max)
			  ---@TermFilter nvarchar(max)
			  ---@FundsToCloseFilter nvarchar(max)
			  ---@InterestRateFilter nvarchar(max)
     
		  ---Price Filter
			SET @filter = CASE WHEN @maxPrice IS NOT NULL AND LEN(@maxPrice) > 0 AND @maxPrice<>0
			THEN 'prop.TargetPrice<=''' + @maxPrice +''''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			SET @MinPriceFilter = CASE WHEN @minPrice IS NOT NULL AND LEN(@minPrice) > 0 AND @minPrice<>0
			THEN 'prop.TargetPrice>=' + @minPrice +''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			-----Status Filter

			SET @StatusFilter = CASE WHEN @status IS NOT NULL AND LEN(@status) > 0 AND @status<>0
			THEN 'prop.Status=' + @status +''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			-----Property Type Filter

			SET @PropertyTypeFilter = CASE WHEN @propertyType IS NOT NULL AND LEN(@propertyType) > 0  AND @propertyType<>0
			THEN 'prop.PropertyTypeId=' + @propertyType +''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			-----Year Built Filter

			SET @YearBuiltFilter = CASE WHEN @maxYearBuilt IS NOT NULL AND LEN(@maxYearBuilt) > 0 AND @maxYearBuilt<>0
			THEN 'prop.YearBuilt<=''' + @maxYearBuilt +''''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			SET @minYearBuiltFilter = CASE WHEN @minYearBuilt IS NOT NULL AND LEN(@minYearBuilt) > 0 AND @minYearBuilt<>0
			THEN 'prop.YearBuilt>=' + @minYearBuilt +''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			-------Funds to Close Filter

			--SET @FundsToCloseFilter = CASE WHEN @maxFundsToClose IS NOT NULL AND LEN(@maxFundsToClose) > 0 AND @maxFundsToClose<>0
			--THEN 'prop.YearBuilt=''' + @maxFundsToClose +''''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			--SET @FundsToCloseFilter = CASE WHEN @minFundsToClose IS NOT NULL AND LEN(@minFundsToClose) > 0 AND @minFundsToClose<>0
			--THEN 'prop.YearBuilt=' + @minFundsToClose +''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			-----Interest Rate Range Filter
			--SET @InterestRateFilter = CASE WHEN @maxPrice IS NOT NULL AND LEN(@maxPrice) > 0 AND @maxPrice<>0
			--THEN 'prop.Cost<=''' + @maxPrice +''''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			--SET @InterestRateFilter = CASE WHEN @minInterestRate IS NOT NULL AND LEN(@minInterestRate) > 0 AND @minInterestRate<>0
			--THEN 'prop.Cost>=' + @minInterestRate +''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			-----Land Size Filter

			SET @LandSizeFilter = CASE WHEN @maxAcresLandSize IS NOT NULL AND LEN(@maxAcresLandSize) > 0 AND @maxAcresLandSize<>0
			THEN 'prop.LandArea<=''' + @maxAcresLandSize +''''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			SET @MinLandSizeFilter = CASE WHEN @minAcresLandSize IS NOT NULL AND LEN(@minAcresLandSize) > 0 AND @minAcresLandSize<>0
			THEN 'prop.LandArea>=' + @minAcresLandSize +''  
			ELSE '''' + @all + ''' = ''' + @all + '''' 
			END

			-----Beds Filter

			--SET @BedsFilter = CASE WHEN @maxBeds IS NOT NULL AND LEN(@maxBeds) > 0 AND @maxBeds<>0
			--THEN 'prop.Beds<=''' + @maxBeds +''''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			--SET @MinBedsFilter = CASE WHEN @minBeds IS NOT NULL AND LEN(@minBeds) > 0 AND @minBeds<>0
			--THEN 'prop.Beds>=' + @minBeds +''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END

			-------Term Filter

			--SET @TermFilter = CASE WHEN @Term IS NOT NULL AND LEN(@Term) > 0  AND @Term<>0
			--THEN 'prop.Term=' + @Term +''  
			--ELSE '''' + @all + ''' = ''' + @all + '''' 
			--END
 
			SET @sqlData=N' SELECT Count(*) Over() AS TotalRecords,  
			prop.PropertyId,
			prop.Title,
			prop.Description,
			prop.Latitude,
			prop.Longitude,
			prop.IsActive,
			prop.PropertyTypeId,
			prop.Status,
			prop.TargetPrice,
			prop.ImageName,
			prop.RelationshipToProperty,
			prop.Address1,
			prop.Address2,
			prop.City,
			prop.ZipCode,
			prop.BuildingStatus,
			prop.BuildingCount,
			prop.Units,
			prop.Occupancy,
			prop.BuiltSquareFootage,
			prop.Floors,
			prop.YearBuilt,
			prop.YearRenovated,
			prop.LandArea,
			prop.Construction,
			prop.Elevators,
			prop.ParkingCount,
			prop.Zoning,
			prop.ZoningDescription,
			prop.DeliveryBays
			--prop.Beds,prop.Baths,prop.Units_,prop.UnitArea,prop.AskingRent,prop.Highlights,prop.IdentificationVarification
			from Property as prop
			where '+@filter+' AND '+@MinPriceFilter+' AND '+@StatusFilter+' AND '+@PropertyTypeFilter+' 
			AND '+@YearBuiltFilter+' AND '+@minYearBuiltFilter+' AND '+@LandSizeFilter+' AND '+@MinLandSizeFilter
			--+' AND '+@BedsFilter+' 
			--AND '+@MinBedsFilter+''
			Print(@sqlData)
			EXEC( @sqlData);
END


--sp_help Property
