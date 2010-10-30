Cartola-Addon
======================

O Cartola-Addon é um plugin para Firefox que informa ao usuário o status do mercado do Cartola FC e alerta para fechamento e término do processo de atualização.

Dependências
============

 * Firefox (duh)

Instalação (para desenvolvedores)
==================================

Simplesmente clone o projeto e crie um link simbólico no diretório de extensões do Firefox.

Recomendo a criação de um perfil de teste (i.e. dev).

Para criação de perfil:

No MacOS 10.6::
.. code-block:: bash

	$ /Applications/Firefox.app/Contents/MacOS/firefox-bin -profilemanager


Para criação de link simbólico (assumindo que será usado o profile dev):

No MacOS 10.6::
.. code-block:: bash

	$ cd /Users/<user>/Library/Application\ Support/Firefox/Profiles/9qu9rem6.dev/extensions
	$ln -s /workspace/cartola-addon ./cartolafc@cartolafc.com

E-mail: victor.pantoja at gmail com
