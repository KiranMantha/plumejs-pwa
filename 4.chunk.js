(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{45:function(e,t,o){"use strict";o.r(t);var n=o(0),l=o(1),s=o(8);let a=class NestedModal{constructor(e){this.modalsrvc=e,this.nestedModalData={}}openAnotherModal(){const e=this.modalsrvc.show({renderTemplate:()=>l.html`<div>i'm nested modal</div>`,modalTitle:"nested modal",modalClass:"nested-class"});e.onOpen.subscribe(()=>{console.log("nested modal open")}),e.onClose.subscribe(()=>{console.log("nested modal closed")})}render(){return l.html`
			<div>sample modal</div>
			<div>${this.nestedModalData.message}</div>
			<button
				class="btn btn-sm btn-primary"
				onclick=${()=>{this.openAnotherModal()}}
			>
				open another modal
			</button>
		`}};Object(n.__decorate)([Object(l.Input)(),Object(n.__metadata)("design:type",Object)],a.prototype,"nestedModalData",void 0),a=Object(n.__decorate)([Object(l.Component)({selector:"nested-modal"}),Object(n.__metadata)("design:paramtypes",[s.ModalService])],a);let i=class PlumeComponents{constructor(e,t){this.modalsrvc=e,this.notifySrvc=t,this.toggleInput={onchange:this.onToggleChange.bind(this),onText:"ON",offText:"OFF"},this.multiSelectOptions={data:[{name:"option1"},{name:"option2"},{name:"option3"},{name:"option4"},{name:"option5"}],displayField:"name",multiple:!1,enableFilter:!0,disableDropdown:!1,buttonText:e=>0===e.length?"None selected":e.length>3?e.length+" selected":e.map(e=>e.name).join(", "),onchange:e=>{console.log(e)}}}openModal(){const e=this.modalsrvc.show({renderTemplate:()=>l.html`<nested-modal nestedModalData=${{message:"Hello World"}}></nested-modal>`,modalTitle:"testing modal",modalClass:"sample-class"});e.onOpen.subscribe(()=>{console.log("main modal open",e.Id)}),e.onClose.subscribe(()=>{console.log("main modal closed")})}notify(){this.notifySrvc.sendMessage("hello world",s.NotificationType.Info)}onToggleChange(e){console.log(e)}render(){return l.html`
            <div>
				<h2 class='mb-20'>Plumejs UI Control Collection</h2>
				<div class='mb-20'>
					<h5>Modal</h5>
					<button
						class="btn btn-sm btn-primary"
						onclick=${()=>{this.openModal()}}
					>
						Open Modal
					</button>
				</div>
				<div class='mb-20'>
					<h5>Notification</h5>
					<button class='btn btn-sm btn-primary' onclick=${()=>{this.notify()}}>Notify</button>
				</div>
				<div class='mb-20'>
					<h5>Toggle Button</h5>
					<toggle-button toggleOptions=${this.toggleInput}></toggle-button>
				</div>
				<div class='mb-20'>
					<h5>Multi select</h5>
					<div style='width: 300px'>
						<multi-select multiSelectOptions=${this.multiSelectOptions}></multi-select>
					</div>
				</div>
            </div>
        `}};i=Object(n.__decorate)([Object(l.Component)({selector:"plume-comp"}),Object(n.__metadata)("design:paramtypes",[s.ModalService,s.NotificationService])],i)}}]);