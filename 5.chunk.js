(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{48:function(t,e,o){"use strict";o.r(e);var s=o(0),l=o(1),i=o(8);let n=class NestedModal{constructor(t){this.modalsrvc=t,this.nestedModalData={}}openAnotherModal(){const t=this.modalsrvc.show({renderTemplate:()=>l.html`<div>i'm nested modal</div>`,modalTitle:"nested modal",modalClass:"nested-class"});t.onOpen.subscribe(()=>{console.log("nested modal open")}),t.onClose.subscribe(()=>{console.log("nested modal closed")})}render(){return l.html`
			<div>sample modal</div>
			<div>${this.nestedModalData.message}</div>
			<button
				class="button is-small is-info"
				onclick=${()=>{this.openAnotherModal()}}
			>
				open another modal
			</button>
		`}};Object(s.__decorate)([Object(l.Input)(),Object(s.__metadata)("design:type",Object)],n.prototype,"nestedModalData",void 0),n=Object(s.__decorate)([Object(l.Component)({selector:"nested-modal"}),Object(s.__metadata)("design:paramtypes",[i.ModalService])],n);let a=class PlumeComponents{constructor(t,e){this.modalsrvc=t,this.notifySrvc=e,this.toggleInput={onchange:this.onToggleChange.bind(this),onText:"ON",offText:"OFF"},this.multiselectToggles={enableMultiselect:{onchange:t=>{this.multiSelectOptions.multiple=t,this.multiSelectOptions.resetWidget=!0,this.update()}},disableDropdown:{onchange:t=>{this.multiSelectOptions.disableDropdown=t,this.multiSelectOptions.resetWidget=!0,this.update()}},enableFilter:{onchange:t=>{this.multiSelectOptions.enableFilter=t,this.multiSelectOptions.resetWidget=!0,this.update()}}},this.multiSelectOptions={data:[{name:"option1"},{name:"option2"},{name:"option3"},{name:"option4"},{name:"option5"}],displayField:"name",multiple:!1,disableDropdown:!1,buttonText:t=>0===t.length?"None selected":t.length>3?t.length+" selected":t.map(t=>t.name).join(", "),onchange:t=>{console.log(t)}}}openModal(){const t=this.modalsrvc.show({renderTemplate:()=>l.html`<nested-modal nestedModalData=${{message:"Hello World"}}></nested-modal>`,modalTitle:"testing modal",modalClass:"sample-class"});t.onOpen.subscribe(()=>{console.log("main modal open",t.Id)}),t.onClose.subscribe(()=>{console.log("main modal closed")})}notify(){this.notifySrvc.sendMessage("hello world",i.NotificationType.Info)}notifyWithAutoHide(){this.notifySrvc.sendMessage("hello world",i.NotificationType.Info,!0)}onToggleChange(t){console.log(t)}render(){return l.html`
					<div>
						<h2 class='title is-3 mb-20'>Plumejs UI Control Collection</h2>
						<div class='mb-20'>
							<h5 class='title is-5'>Modal</h5>
							<button
								class="button is-small is-info"
								onclick=${()=>{this.openModal()}}
							>
								Open Modal
							</button>
						</div>
						<div class='mb-20'>
							<h5 class='title is-5'>Notification</h5>
							<button class='button is-small is-info mr-10' onclick=${()=>{this.notify()}}>Notify with action</button>
							<button class='button is-small is-info' onclick=${()=>{this.notifyWithAutoHide()}}>Notify with auto hide</button>
						</div>
						<div class='mb-20'>
							<h5 class='title is-5'>Toggle Button</h5>
							<toggle-button toggleOptions=${this.toggleInput}></toggle-button>
						</div>
						<div class='mb-20'>
							<h5 class='title is-5'>Multi select</h5>
							<div>
								<div class='is-flex mb-20'>
									<span>enable multi select</span> <toggle-button toggleOptions=${this.multiselectToggles.enableMultiselect}></toggle-button>
								</div>
								<div class='is-flex mb-20'>
									<span>disable dropdown</span> <toggle-button toggleOptions=${this.multiselectToggles.disableDropdown}></toggle-button>
								</div>
								<div class='is-flex mb-20'>
									<span>enable filtering</span> <toggle-button toggleOptions=${this.multiselectToggles.enableFilter}></toggle-button>
								</div>
							</div>
							<div class='is-flex'>
								<multi-select multiSelectOptions=${this.multiSelectOptions}></multi-select>
							</div>
						</div>
					</div>
			`}};a=Object(s.__decorate)([Object(l.Component)({selector:"plume-comp"}),Object(s.__metadata)("design:paramtypes",[i.ModalService,i.NotificationService])],a)}}]);