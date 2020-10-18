
window.onload = function () {

let	 character = document.querySelector( '.character' ),
	 img = document.querySelector( '.character img' ),
	 step = 20,
	 h = character.offsetHeight,
	 squat = 0.4,
	 bems = document.querySelector( '.bems' ),
	 animated = false,
     characterHeight = character.clientHeight,
     squatHeight = character.clientHeight * ( 1 - 0.4 ),
     characterWidth = character.clientWidth,
     squatWidth = character.clientWidth * 1.15;


	allowedField = function () {
		let startPointX = 0,
			startPointY = 0,
			endtPointX = window.innerWidth,
			endPointY = window.innerHeight,
			x = character.offsetLeft,
			y = character.offsetTop,
			w = character.offsetWidth,
			buffer = 35;

		let startEdgeX = x >= startPointX + buffer,  
			startEdgeY = y >= startPointY + buffer,  
			endEdgeX = x <= endtPointX - w - buffer,  
			endEdgeY = y <= endPointY - h - buffer; 

		if ( !startEdgeX || !startEdgeY || !endEdgeX || !endEdgeY ) {
			
			bems.classList.add( 'show' );
			setTimeout( function() {
				bems.classList.remove( 'show' );
			},2000 );
		} 

		if ( !startEdgeX ) {
			character.style.left = character.offsetLeft + step * 2 + 'px';

		} else if ( !startEdgeY ) {
			character.style.top = character.offsetTop + step * 2 + 'px';

		} else if ( !endEdgeX ) {
			character.style.left = character.offsetLeft - step * 2 + 'px';

		} else if ( !endEdgeY ) {
			character.style.top = character.offsetTop - step * 2 + 'px';

		}
		return true;
	}

	let Foo = {
		down: function (){
			if ( !event.ctrlKey ) {
				character.style.top = character.offsetTop + step + 'px';
			};
		},

		jump: function (){
			if ( animated ) return;
					    
			if ( !event.ctrlKey ) {
				character.style.top = character.offsetTop - h/2 + 'px';
				animated = true;
					    	
				setTimeout( function(){
					character.style.top = character.offsetTop + h/2 + 'px';
					animated = false;
				},100 );
			};
		},


		up: function (){
			if ( !event.ctrlKey ) {
			   	character.style.top = character.offsetTop - step + 'px';
			}
		},

		remove: function (){
			character.classList.add('hide');
		},

		right: function (){
			character.style.left = character.offsetLeft + step + 'px';
			img.style.transform = 'rotateY(180deg)';
		},

		left: function (){
				character.style.left = character.offsetLeft - step + 'px';
				img.style.transform = 'rotateY(0deg)';
		},


		aboutMe: function (){
			window.location.href = 'https://en.wikipedia.org/wiki/My_Neighbor_Totoro';
		},

		squate: function () {
			character.style.height = squatHeight + 'px';
			character.style.top = character.offsetTop + characterHeight - squatHeight + 'px';
			character.style.width = squatWidth + 'px';
			character.style.left = character.offsetLeft + (characterWidth - squatWidth)/2 + 'px';
		},

		standUp: function () {
			if ( event.keyCode == 17 ) {
				character.style.height = characterHeight + 'px';
				character.style.top = character.offsetTop - characterHeight + squatHeight + 'px';
				character.style.width = characterWidth + 'px';
				character.style.left = character.offsetLeft - (characterWidth - squatWidth)/2 + 'px';
			};	
		},

	};

	document.onkeydown = function( event ){


	    if ( !allowedField( character ) ){
	        return;
	    }

		allowedField();

	    switch ( event.keyCode ) {

	    	case 37:
	    		Foo.left();
		    	break;

		    case 38:
		    	Foo.up();
			    break;

		    case 39:
		    	Foo.right();
		    	break;

		    case 40:
		     	Foo.down ();   
				break;

		    case 32:
			    Foo.jump();
		    	break;

		    case 17:
		    	Foo.squate();
		    	break;
	    }
	}

	document.onkeyup = function( event ) {
		Foo.standUp();
	}


	class ContextMenu {
		constructor(item, target) {
			this.list = item;
			this.target = target;
		}

		setTarget(target) {
			this.target = target;
		}

		getActions() {
			return {
				jump: Foo.jump,
				right: Foo.right,
				left: Foo.left,
				down: Foo.down,
				up: Foo.up,
				remove: Foo.remove,
				aboutMe: Foo.aboutMe,
			};
		}

		show() {
			event.preventDefault();
			this.target.classList.remove('hidden');
			let self = this;
			document.addEventListener('click' , function(){
				self.hide();
			}, { once: true })
			let x = event.clientX;
			let y = event.clientY;
			this.target.style.cssText = 'left:' + x + 'px;' + 'top:' + y + 'px;';
		}

		hide() {
			this.target.classList.add('hidden');
		}

	};

	let contextMenu = new ContextMenu([
		{
			title: 'Jump',
			action: 'jump'		
		}, 
		{
			title: 'Up',
			action: 'up'
		},
		{
			title: 'Down',
			action: 'down'
		},
		{
			title: 'Right',
			action: 'right',
		},
		{
			title: 'Left',
			action: 'left',
		},

		{
			title: 'Good bye!',
			action: 'remove',
		},
		{
			title: 'About Me',
			action: 'aboutMe',
		},

	]);


	function init() {
		contextMenu.setTarget(document.querySelector('.context-menu'));
		let contextMenuActions = contextMenu.getActions();

		for(let i = 0, item; i < contextMenu.list.length; i++) {
			item = document.createElement('div');
			item.classList.add('item');
			item.innerHTML = contextMenu.list[i].title;
			item.addEventListener('click', contextMenuActions[contextMenu.list[i].action]);

			contextMenu.target.appendChild(item);
		}

		document.addEventListener( 'contextmenu', function(event)  {
			contextMenu.show(event);
		});

		document.addEventListener( 'click', function(event)  {
			allowedField(event);
		});
	}	

	init ();
};
