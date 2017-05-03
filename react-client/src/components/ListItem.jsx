import React from 'react';


const ListItem = (props) => (
  <div>
  <ol id ='Republican'>	Republican:  {((props.item.Republican/props.item.count)*100).toPrecision(2) === "NaN" ? 0 : ((props.item.Republican/props.item.count)*100).toPrecision(2) }% (or {(props.item.Republican) === undefined ? 0 :(props.item.Republican)} Representatives)</ol>
  <ol id = 'Democrat'>	Democrat:  {((props.item.Democratic/props.item.count)*100).toPrecision(2)=== "NaN" ? 0 : ((props.item.Democratic/props.item.count)*100).toPrecision(2)}% (or {(props.item.Democratic) === undefined ? 0 :(props.item.Democratic)} Representatives)</ol>
  <ol id = 'Independent'> Independent/Unaffiliated: {((props.item.Independent/props.item.count)*100).toPrecision(2)=== "NaN" ? 0 : ((props.item.Independent/props.item.count)*100).toPrecision(2)}% (or {(props.item.Independent)=== undefined ? 0 :(props.item.Independent)} Representatives)</ol>
  	<div id = 'list'> Note that the offices taillied are the following:
  	<div className = 'officeGroup'>Federal</div>
	  	<li>President of the United States</li>
	  	<li>Vice President of the United States</li>
	  	<li>United States Senator</li>
	  	<li>United States House of Representatives</li>
  	<div className = 'officeGroup'>State</div>  	
	  	<li>Governor</li>
	  	<li>Lieutenant Governor</li>
	  	<li>State Senator</li>
	  	<li>State Treasurer</li>
	  	<li>Attorney General</li>
	  	<li>State Controller</li>
	  	<li>Secretary of State</li>
	  	<li>Insurance Commissioner</li>
	  	<li>State Superintendent of Public Instruction</li>

  	<div className = 'officeGroup'>Local</div>  
  		<li>Mayor</li>
	  	<li>Sheriff</li>
	  	<li>Treasurer</li>
	  	<li>County Clerk</li>
	  	<li>City Attorney</li>
	  	<li>District Attorney</li>
	  	<li>County Superior Judge</li>
	  	<li>Assessor-Recorder</li>
	  	<li>Board of Supervisors</li>
  	</div>
  </div>
)

export default ListItem;
