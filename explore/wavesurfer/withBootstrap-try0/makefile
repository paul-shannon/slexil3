default:
	@echo targets: kb, publish
kb:
	m4 --quiet -P kb.pre > kb.pre2
	sed  s/COMMA/,/g kb.pre2 > kb.js


publish:
	scp * paulshannnon@pshannon.net:public_html/pshannon.net/slexil2/


