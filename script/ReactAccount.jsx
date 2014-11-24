/** @jsx React.DOM */
var AccData = [ ['Assigned Account Manager','Role Type','Institution Type','Account Start Date','Account Type'],
				['Region','Sub Region','Country','Area'],
				['Primary Customer Contact','Address','Customer Title','Phone','Email'],
				['Product Attributes Used','Primary Repair Strategy','Products Deployed','RTS SLA Strategy']			
	];

var AccountPopUp = React.createClass({
	displayName: 'AccountPopUp',
	handleClick: function(event) {
    	ovrlayClasName = document.getElementsByClassName('overlay')[0];
		ovrlayClasName.className =ovrlayClasName.className.replace( 'visibilityVisible opacityHalf' , ' visibilityHidden ' );
		popUpClasName = document.getElementsByClassName('popup')[0];
		popUpClasName.className = popUpClasName.className.replace( 'visibilityVisible opacityFull', ' visibilityHidden ' );
 	},
	render : function () {

		return (
			<section className='main_container fLeft'>
				<article className='acc_hdng_wrpr fLeft'>
					<h1 className='acc_hding fLeft'>Account 360 - <span className='accountTitleSpan'>Brisbane CEO</span></h1>
					<div className='close_icon_plchldr fRight' onClick={this.handleClick}>x</div>
				</article>
				{this.props.AccData.map(function(singleRowData) {
			return(
				<CreateSingleRow singleRowData={singleRowData}></CreateSingleRow>
			);
		})}
				<article className='modification_dtls_div fLeft'>
					<div className='last_modified_wrpr fLeft'>
						<span className='last_modifd_txt fLeft'>Last Modified :</span>
						<time className='last_modified_tme fLeft'>09/01/2002</time>
					</div>
					<div className='last_updated_wrpr fLeft'>
						<span className='last_updated_txt fLeft'>Last Update :</span>
						<time className='last_updated_tme fLeft'>09/01/2002</time>
					</div>
					<div className='modified_by_wrpr fLeft'>
						<span className='modified_by_txt fLeft'>Modified by :</span>
						<span className='modified_by_name fLeft'>John Doe</span>
					</div>
				</article>
			</section>
		);
	}
});

var CreateSingleRow = React.createClass({
	displayName: "CreateSingleRow",
	render : function () {
		return (<section className='inr_dtls_container fLeft'>
					<AccSideData fltSide = 'left' singleRowData={this.props.singleRowData} />
					<AccSideData fltSide = 'right' singleRowData={this.props.singleRowData} />
				</section>);
	}
});

var AccSideData = React.createClass({
	getInitialState: function() {
    	return {arrToPass: [], fullArray: [], fltClass: '', i : 0, j : 0, InnerOneSideSectn : null};
  	},
  	displayName: 'AccSideData',
	componentWillMount: function() {
		var fullArray = this.state.fullArray,
			i = this.state.i,
			j = this.state.j,
			arrtopass = this.state.arrToPass,
			fltclass,
			inneronesidesectn;
		fullArray = this.props.singleRowData;

		(this.props.fltSide === 'left') ? (arrtopass = filterArrayToPass(0, fullArray.length/2, fullArray) , fltclass = 'column_left_sec fLeft') :
		 								  ((this.props.fltSide === 'right') ? (arrtopass = filterArrayToPass(Math.round(fullArray.length/2), fullArray.length, fullArray) , fltclass = 'column_right_sec fRight') : null);
		console.log('arrToPass');
		//console.log(arrToPass);
		inneronesidesectn =  arrtopass.map(function(accTxtInfo){
								classNameForLbl = accTxtInfo.replace(/[^a-zA-Z]/g, "") + ' ' + 'row_name_val fLeft';
								return(
									<InnerAccDetails accTxtInfo={accTxtInfo} classNameForLbl={classNameForLbl} />
								);
							});

		this.setState({fltClass: fltclass});
		this.setState({InnerOneSideSectn: inneronesidesectn});
	},
	render : function () {
		return(
				<section className={this.state.fltClass}>
					{this.state.InnerOneSideSectn}		
				</section>
		);
	}
});

function filterArrayToPass(strtVal, endVal, arr) {
	var filteredArr = []
	, i;
	for (var i = strtVal; i < endVal; i++) {
		filteredArr[i] = arr[i];
	}
	return filteredArr;
}
var InnerAccDetails =  React.createClass({
	displayName: 'InnerAccDetails',
	render : function () {
		return(
			<div className='cmn_row_wrpr fLeft'>
				<label className='row_name fLeft'>
					<span className='label_name_plchldr_spn'>{this.props.accTxtInfo}</span>
					<span className='fRight'>:</span></label>
				<label className={this.props.classNameForLbl}></label>
			</div>
		);
	}
});

function AccountPopUpRenderFunction() {
	var ovrlayClasName
		, popUpClasName;
	
	ovrlayClasName = document.getElementsByClassName('overlay')[0];
	ovrlayClasName.className =ovrlayClasName.className.replace( 'visibilityHidden', ' visibilityVisible opacityHalf ' );
	popUpClasName = document.getElementsByClassName('popup')[0];
	popUpClasName.className = popUpClasName.className.replace( 'visibilityHidden', ' visibilityVisible opacityFull ' );
	React.render(
	  <AccountPopUp AccData = {AccData}/>,
	  document.getElementsByClassName('popup')[0]
	);
}
