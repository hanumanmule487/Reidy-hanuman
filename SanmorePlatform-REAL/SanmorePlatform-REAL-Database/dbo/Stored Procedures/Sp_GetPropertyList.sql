

--Exec Sp_GetPropertyList null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,NULL,NULL,null,'2024-01-06','2024-01-09'
--Exec Sp_GetPropertyList null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,NULL,NULL,null,null,null
                          
CREATE PROCEDURE [dbo].[Sp_GetPropertyList] (
    @status int=null,--1
	@City nvarchar(max)=null,--2
	@maxYearBuilt nvarchar(max)=null,--3
    @minYearBuilt nvarchar(max)=null,--4
	@FromfundToClose decimal(18,2)=null,--5
	@TofundToClose decimal(18,2)=null,--6
	@ZipCode int=null,--7
	@BuildingMinSF decimal(18,2)=null,--8
	@BuildingMaxSF decimal(18,2)=null,--9   
	@LandMinAcres decimal(18,2)=null,-- 10      
	@LandMaxAcres decimal(18,2)=null,-- 11   
	@UnitBedsMin int=null,--12
	@UnitBedsMax int=null,--13
	@Keyword nvarchar(max)=null,--14
	@EnteredDate nvarchar(max)=null,--15
	@ReidyId int=null,--16
	@YearBuiltMin int=null,--17
	@YearBuiltMax int=null,--18
	@PropertyTypeList varchar(max)=NULL,--19
	@PropertyKeyword  varchar(max)=NULL,--20
	@RegionName varchar(max)=null,--21	
	@FromDate VARCHAR(maX)=NULL,
	@ToDate VARCHAR(maX)=NULL

	)
AS
BEGIN



SET NOCOUNT ON;
                /*Declare @StartDate Date;
				Declare @PropKeyword varchar(max);
				
				IF @EnteredDate=1
				SET @StartDate=DATEADD(DAY,-1,GETDATE());
				
				IF @EnteredDate=2
				SET @StartDate=DATEADD(DAY,-3,GETDATE());

				IF @EnteredDate=3
				SET @StartDate=DATEADD(WEEK,-1,GETDATE());

				IF @EnteredDate=4
				SET @StartDate=DATEADD(WEEK,-2,GETDATE());

				IF @EnteredDate=5
				SET @StartDate=DATEADD(MONTH,-1,GETDATE());

				IF @EnteredDate=6
				SET @StartDate=DATEADD(MONTH,-3,GETDATE());

				IF @EnteredDate=7
				SET @StartDate=DATEADD(YEAR,-1,GETDATE());			

				if @PropertyKeyword is not null
				    begin
				         set @PropKeyword=@PropertyKeyword;
				    end
				ELSE
				    Begin 
				    set @PropKeyword=@Keyword
				    end*/
		

		SELECT prop.PropertyId 
			,prop.RelationshipToProperty 
			,prop.TargetPrice
		--	,prop.Title
		    ,pt.PropertyTypeName + ' ' +'in ' + prop.City + ' ' +'and ' + st.LongName As Title
		    ,prop.Address1
		    ,prop.Address2
			,prop.City 
			,prop.StateId 
			,st.LongName
			,prop.ZipCode 
			,prop.BuildingStatus 
			,prop.BuildingCount 
			,prop.Units 
			,prop.BuiltSquareFootage 
			,prop.Floors 
			,prop.YearBuilt
			,prop.YearRenovated
			,prop.LandArea
			,prop.Occupancy
			,prop.WillOccupantStayAfterSale 
			,prop.Construction 
			,prop.Elevators 
			,prop.ParkingCount 
			,prop.Governance 
			,prop.ZoningDescription 
			,prop.Description
			,prop.DeliveryBays 
			,prop.Highlights 
			,prop.AcceptUserAgreement 
			,prop.PropertyTypeId 
			,pt.PropertyTypeName
			
			,prop.IsActive 
			,prop.Status 
			,prop.Latitude 
			,prop.Longitude 
			,prop.CreatedBy 
			,prop.CreatedOn 
			,prop.ModifiedBy 
			,prop.ModifiedOn
			,prop.ImageName
			from Property as prop
			left join PropertyType as pt on prop.PropertyTypeId=pt.PropertyTypeId
			Left join State as st on prop.StateId=st.StateId
			--left join DueDiligenceDocument as dc on prop.PropertyId=dc.PropertyId

			/*WHERE (
				  prop.Status =@status
				   OR @status IS NULL
				   OR @status = ''
				  
			)
			
			AND(

					prop.City LIKE '%' + @City + '%'
					OR @City IS NULL
					OR @City = ''
					)
			AND(

					pt.PropertyTypeName LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					
					OR(

					prop.Description LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)

					OR(
					prop.Address1 LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)

					OR(
					prop.Address2 LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)

					OR(
					prop.City LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)

					OR(
					prop.ZoningDescription LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)
					OR(
					prop.Highlights LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)
						OR(
					prop.Construction LIKE '%' + @PropKeyword + '%'
					OR @PropKeyword IS NULL
					OR @PropKeyword = ''
					)
				)
		   --AND(
			
			--      prop.TargetPrice between ISNULL(@FromfundToClose,prop.TargetPrice) AND ISNULL(@TofundToClose,prop.TargetPrice)
				 
			--	 )
		    AND(
			       prop.ZipCode =@ZipCode
				   OR @ZipCode IS NULL
				   OR @ZipCode = ''
				 )
		 
	       --AND(
			
			--      prop.BuiltSquareFootage between ISNULL(@BuildingMinSF,prop.BuiltSquareFootage) AND ISNULL(@BuildingMaxSF,prop.BuiltSquareFootage)
				 
			--	 )
	       --AND(
			--      prop.LandArea between ISNULL(@LandMinAcres,prop.LandArea) AND ISNULL(@LandMaxAcres,prop.LandArea)--Entry data issue 
				 
				-- )
		

		     AND(
			         @UnitBedsMin is null OR prop.Units>=@UnitBedsMin
			     )
		   	AND(
			         @UnitBedsMax is null OR prop.Units<=@UnitBedsMax
			      )

		AND(
		             prop.CreatedOn>=@StartDate
					 OR @EnteredDate IS NULL
				     OR @EnteredDate = ''
              )				

	      AND(
			       prop.PropertyId =@ReidyId
				   OR @ReidyId IS NULL
				   OR @ReidyId = ''
				   )
		  AND(
				 @PropertyTypeList is Null OR CONVERT(varchar(20), prop.PropertyTypeId) in(SELECT VALUE FROM string_split(@PropertyTypeList,','))
				 )
			AND(
			     @YearBuiltMin IS NULL OR prop.YearBuilt >= @YearBuiltMin
				 
				 )
			AND(
			     @YearBuiltMax IS NULL OR prop.YearBuilt <= @YearBuiltMax
				 
				 )
			 AND(

					st.LongName LIKE '%' + @RegionName + '%'
					OR @RegionName IS NULL
					OR @RegionName = ''
				)
				 AND (
                     (
                           @FromDate IS NOT NULL
                           AND @ToDate IS NOT NULL
                            AND CONVERT(DATE, prop.CreatedOn) >= @FromDate
                           AND CONVERT(DATE, prop.CreatedOn) <= @ToDate
                           )
                     OR (
                           @FromDate IS NOT NULL
                           AND @ToDate IS NULL
                           AND CONVERT(DATE, prop.CreatedOn) >= @FromDate
                           )
                     OR (
                           @FromDate IS NULL
                           AND @ToDate IS NOT NULL
                           AND CONVERT(DATE, prop.CreatedOn) <= @ToDate
                           )
                     OR (
                           @FromDate IS NULL
                           AND @ToDate IS NULL
                           )
                     )*/
					 
					 
					
					
				
	END

