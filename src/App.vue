<template>
  <div id="app">
	 <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Footer
  }
}
</script>

<style>
*{margin:0;padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-text-size-adjust:none;-webkit-user-select:none;-ms-user-select:none;user-select:none;font-family:Arial, "微软雅黑";}
img{border:none;max-width:100%;vertical-align:middle;}
body,p,form,input,button,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6{margin:0;padding:0;list-style:none;overflow-x:hidden}
body{ background-color: #fff;}

h1,h2,h3,h4,h5,h6{font-size:100%;}
input,textarea{-webkit-user-select:text;-ms-user-select:text;user-select:text;-webkit-appearance:none;font-size:1em;line-height:1.5em;}
table{border-collapse:collapse;}
input,select,textarea{outline:none;border:none;background:none;}
a{outline:0;cursor:pointer;*star:expression(this.onbanner=this.blur());}
a:link,a:active{text-decoration:none;}
a:visited{text-decoration:none;}
a:hover{color:#f00;text-decoration:none;}
a{text-decoration:none;-webkit-touch-callout:none;}
em,i{font-style:normal;}
li,ol{list-style:none;}
html{font-size:10px;}
.clear{clear:both;height:0;font-size:0;line-height:0;visibility:hidden; overflow:hidden;}
.fl{float:left;}
.fr{float:right;}
body{ margin:0 auto;max-width:640px; min-width:320px;color:#555;background:#fff;height:100%;}
a{color: #222;text-decoration: none}
* { touch-action: pan-y; }    /*解决滑动时的警告*/

.el-select1,.el-select2{
	width:21%;
	text-align: center;
	float: left;
	border-radius: 20px;
	font-size:13px;
	margin-left: 1%;
}
.el-select2{
	width:63%;
}
</style>
