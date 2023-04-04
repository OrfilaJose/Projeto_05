$(window).on('load', function(){ /*pre loade*/
   	$('.box-load').fadeOut();
   	$('.conteudoTotal').delay(12000000).css("display","block");
   	/*
   	L1-quando todo o site carregar execute a seguinte função.
   	L2-vai dar um fade out (sumir aos poucos) com a animação.
   	L3-faz o conteúdo aparecer tendo um delay.
   	o delay faz ocorrer um atraso em microssegundos.
   	*/
})
$(function(){

	/*Filtre por preço-Vendas.html*/
	var currentValue = 0;
	var isDrag = false;

	$('.botaoBarra').mousedown(function(e){
		isDrag = true;
	});
	$(document).mouseup(function(e){
		isDrag = false;
		enableTextSelection();
	});

	$('.barra').mousemove(function(e){
		if(isDrag == true){
			disabelTextSelection();
			var preco_atual=0;
			var preco_maximo = 70000;
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;

			if(mouseX < 0){
				mouseX =0;
			}
			if(mouseX > elBase.width()){
				mouseX = elBase.width();
			}
			currentValue = (mouseX / elBase.width()) * 100;
			$('.barraProgresso').css('width',currentValue +'%');
			if(mouseX > 30){
				mouseX-=50;
				/*Fiz isso para o botão da barra ficar 
				dentro da barra quando chegasse no final*/
			}
			$('.botaoBarra').css('left',mouseX+'px');
			preco_atual = (currentValue/100)*preco_maximo;
			preco_atual = formatarPreco(preco_atual);
			$('.precoPesquisa').html('R$ '+preco_atual);
		}
	})
	function formatarPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		preco_arr = preco_atual.split('.');
		var novoPreco = formatarTotal(preco_arr);
		return novoPreco;
		console.log(preco_arr);
	}
	function formatarTotal(preco_arr){
		if(preco_arr[0] < 1000){
			return preco_arr[0]+','+preco_arr[1];
		}
		else if(preco_arr[0] < 10000){
			return preco_arr[0][0]+','+preco_arr[0].substr(1,preco_arr[0].length)+','+preco_arr[1];
		}
		else{
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+','+preco_arr[1];
		}	
	}
	function disabelTextSelection(){
		$('body').css('-webkit-user-select','none');
		$('body').css('-moz-user-select','none');
	    $('body').css('-ms-user-select','none');
	    $('body').css('-o-user-select','none');
	    $('body').css('user-select','none');	
	}

	function enableTextSelection(){
		$('body').css('-webkit-user-select','auto');
		$('body').css('-moz-user-select','auto');
		$('body').css('-ms-user-select','auto');
		$('body').css('-o-user-select','auto');
		$('body').css('user-select','auto');
	}

	/*Galeria.html*/
	var primeiraImg = $('.varias-img-single .img').eq(0).css("background-image");
	$('.img-grande').css('background-image',primeiraImg);
	$('.img-grande').css('background-size','100% 100%');
	$('.img-grande').css('background-position','center');
	$('.varias-img-single:nth-of-type(1) .img:nth-of-type(1)').css('border','7px solid red');

	$('.varias-img-single .img').click(function(){
		$('.varias-img-single .img').css('border','7px solid white');
		$(this).css('border','7px solid red');
		var img = $(this).css('background-image');
		$('.img-grande').css('background-image',img);
		$('.img-grande').css('background-size','100% 100%');
		$('.img-grande').css('background-position','center');
	});


	/*Aplicar scroll dinâmica somente em Contato*/
	$('nav ul li:last-of-type a').click(function(){
		var cor = $('nav ul li:nth-of-type(1) a').css("color");
        if(cor == 'rgb(250, 0, 0)'){
        	var valorHref = $(this).attr('href');					
		    var offSetTop = $(valorHref).offset().top;
		    $('html,body').animate({'scrollTop':offSetTop});
		    return false;
        }
	});
	var directory = 'C:/Users/WINDOWS%2010/Desktop/Curso%20Dank%20Code/Projeto_05/';
	$('a[href = "#contato"]').click(function(){
		location.href = directory+'index.html#contato';
		return false;
		/*alert("oi");*/		
	});
	checkUrl();
	function checkUrl(){
		var url = location.href.split('/');
		var curPage = url[url.length - 1].split('/');
		if(curPage[0] == 'index.html#contato'){
		    var valorHref = $('nav ul li:last-of-type a').attr('href');					
		    var offSetTop = $(valorHref).offset().top;
		    $('html,body').animate({'scrollTop':offSetTop});
		    return false;
		}
	}
	

	/*validação dos campos do formulário*/
	$('form').submit(function(e){
		e.preventDefault();
		var nome = $('input[name=nome]').val();
		var email = $('input[name=email]').val();
		var celular = $('input[name=celular]').val();

		if(verificarNome(nome) == false){
			aplicarCampoInvalido($('input[name=nome]'));
		}
		else{
			console.log("Campo Nome OK.");
		}
		if(verificarCelular(celular) == false){
			aplicarCampoInvalido($('input[name=celular]'));
		}
		else{
			console.log("Campo Celular OK.");
		}
		if(verificarEmail(email) == false){
			aplicarCampoInvalido($('input[name=email]'));
		}
		else{
			console.log("Campo Email OK.");
		}

	});

	function verificarNome(nome){
		if(nome == ' '){
			return false;
		}
		var qtdEspaco = nome.split(' ').length-1;
		var verificarNome = nome.split(' ');
		if(qtdEspaco >= 2){
			for(var i=0; i <= qtdEspaco; i++){
				if(verificarNome[i].match(/^[A-ZÁÉÍÓÚÇÃÕÀÈÌÒÙ]{1,}[a-záéíóúãõçàèìòù]{1,}$/)){

				}else{
					return false;
				}
			}
		}
		else{
			return false;
		}
	}
    
    function verificarCelular(celular){
    	if(celular == ' '){
    		return false;
    	}
    	if(celular.match(/^\([0-9]{2}\)[0-9]{5}-[0-9]{4}$/) == null){
    		return false;
    	}
    }
    function verificarEmail(email){
    	if(email == ' '){
    		return false;
    	}
    	if(email.match(/^([a-z-_.0-9]{1,})+@+([a-z-_.]{1,})$/) == null){
    		return false;
    	}
    }
	function aplicarCampoInvalido(el){
		el.css('border','2px solid red');
		el.data('invalido','true');
		el.val("Campo Inválido.");
		el.css('color','red');
	}
	function resetarCampo(resetar){
		resetar.css('border','1px solid #ccc');
		resetar.css('color','black');
		resetar.val('');
	}
	$('input[type=text').click(function(){
		var conteudo = $(this).val();
		if(conteudo == 'Campo Inválido.'){
			resetarCampo($(this));
		}
	});


	var clique = 0;
	$('input[name=celular]').keydown(function(){
		var conteudoCelular = $(this).val();
		var qtd = conteudoCelular.length;
		if(qtd == ' '){
			$('input[name=celular]').val("(");
		}
		if(qtd == 3){
			var conteudoCelular = $('input[name=celular]').val();
			var parte1 = conteudoCelular+')';
			$('input[name=celular]').val(parte1);
		}
		if(qtd == 9){
			var parte1 = $('input[name=celular]').val();
			var parte2 = parte1+"-";
			$('input[name=celular]').val(parte2);
		}
		if(clique == 14){
			clique = 0;
		}
	});

	/*Criando slider nos depoimentos em index.html*/
	iniciarSlider();
	var amt;
	function iniciarSlider(){
		amt =$('.depoimento-single').length;
		var sizeContainer = 100 * amt;
		var sizeBoxSingle = 100 / amt;
		$('.depoimento-single').css('width',sizeBoxSingle+'%');
		$('.scroll-equipe02').css('width',sizeContainer+'%');
	}

	var delay= 3000;
	var curIndex = 0;

	function autoPlay(){
		setInterval(function(){
			curIndex++;
			if(curIndex == amt){
				curIndex=0;
			}
			gotoSlider(curIndex);
		},delay);
	}
	autoPlay();

	function gotoSlider(curIndex){
		var offSetX = $('.depoimento-single').eq(curIndex).offset().left-$('.scroll-equipe02').offset().left;
		$('.scroll-equipe').animate({'scrollLeft':offSetX+'px'});
	}
})