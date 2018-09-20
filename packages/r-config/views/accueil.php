<div class="row">
    <div class="col-sm-12">
        <!-- contenu des configurations Raptor -->
        <h2>Configuration application</h2>
        <hr/>
        <div class="row">
            <div class="col-sm-12">                
                <button  ng-click="prendreInfoDefaut()" class="btn btn-default" ng-tooltip="" data-placement="right" title="" data-original-title="Afficher les variables du framework">
                    <span class="txt-menu-r-config">Liste des paramètres de l'application</span></button>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Valeur</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="data in raptorData">
                            <td class="capitalize" ng-bind="data.identifiant | strReplace:'_':' ' "></td>
                            <td>
                                <input type="text" ng-model="data.valeur" class="form-control"/>
                            </td>
                            <td>
                                <button class="btn btn-warning" ng-click="enregistrerData(data)">
                                    <i class="fa fa-save" aria-hidden="true"></i>                 
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <!-- contenu des configurations Raptor -->
        <h2>Configuration menu</h2>
        <hr/>
        <div class="row">
            <div class="col-sm-12">
                <span class="txt-menu-r-config">Création menu</span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Niveau</th>
                            <th>Url</th>
                            <th>Variable associé</th>
                            <th>Icon</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="createmenu.libelle">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="createmenu.niveau">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="createmenu.url">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="createmenu.variable_associe">
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="HTML code" aria-label="HTML code" ng-model="createmenu.icon">
                                    <span class="input-group-addon" ng-bind-html="createmenu.icon"></span>
                                </div>
                            </td>

                            <td>
                                <button class="btn btn-secondary" ng-click="voirIconFontAwesome()">
                                    Choisir icon                  
                                </button> 
                            </td>
                            <td>
                                <button class="btn btn-success" ng-click="ajouterMenu(createmenu)">
                                    <i class="fa fa-plus" aria-hidden="true"></i>                 
                                </button> 
                            </td>
                        </tr>
                    </tbody>
                </table>  
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <span class="txt-menu-r-config">Liste menu</span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Niveau</th>
                            <th>Url</th>
                            <th>Variable associé</th>
                            <th>Icon</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="menu in listeDesMenus">
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="menu.libelle">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="menu.niveau">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="menu.url">
                            </td>
                            <td>
                                <input type="text" placeholder="" class="form-control" ng-model="menu.variable_associer">
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="HTML code" aria-label="HTML code" ng-model="menu.icon">
                                    <span class="input-group-addon" ng-bind-html="menu.icon"></span>
                                </div>
                            </td>

                            <td>
                                <button class="btn btn-secondary" ng-click="voirIconFontAwesomeMenu(menu)">
                                    Choisir icon                  
                                </button> 
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-secondary" ng-click="hautMenu(menu)">
                                        <i class="fa fa-arrow-up" aria-hidden="true"></i>                 
                                    </button> 
                                    <button class="btn btn-secondary" ng-click="basMenu(menu)">
                                        <i class="fa fa-arrow-down" aria-hidden="true"></i>                 
                                    </button> 
                                </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button class="btn btn-secondary" ng-click="gaucheMenu(menu)">
                                        <i class="fa fa-arrow-left" aria-hidden="true"></i>                 
                                    </button> 
                                    <button class="btn btn-secondary" ng-click="droiteMenu(menu)">
                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>                 
                                    </button> 
                                </div>
                            </td>
                            <td>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <button class="btn btn-warning" ng-click="enregistrerMenu(menu)">
                                            <i class="fa fa-save" aria-hidden="true"></i>                 
                                        </button> 
                                    </div>
                                    <div class="col-sm-6">
                                        <button class="btn btn-danger" ng-click="supprimerMenu(menu)">
                                            <i class="fa fa-trash-o" aria-hidden="true"></i>                
                                        </button>
                                    </div>
                                </div>
                            </td>

                        </tr>
                    </tbody>
                </table>  
                <hr/>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <span class="txt-menu-r-config">Notes [url]</span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <p>Les Urls qui se trouvent dans les champs "Url" doient aussi être présent dans <span class="success txt-bold">C:\wamp64\www\raptor\ressources\router.js </span></p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <span class="txt-menu-r-config">Notes [variable associé]</span>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <p>Pour ajouter des variables associé, il faut ajouter des methodes utilisant $rootScope dans <span class="success txt-bold">app.run</span> avec la variable associé que vous avez saisi dans le champ "Variable associé".</p>
                <p>C:\wamp64\www\rap\ressources\router.js</p>
                <p>Exemple: <span class="txt-bold text-danger">showAdministrateur</span></p>
                <pre>                        
                    <code class="javascript hljs">
                        $rootScope.admindb = $cookieStore.get('admin') == "t";  //admin représente ici la clé du coockie
                        if ($rootScope.admindb)
                            $rootScope.showAdministrateur = true;               //showAdministrateur représente la variable que vous avez choisi de saisir dans notre menu ci-dessus.
                        else
                            $rootScope.showAdministrateur = false;
                    </code>           
                </pre>
                <p>Il faut ajouter les importations des coockies de celui ci dans <span class="success txt-bold">CtrlLogin</span> et <span class="success txt-bold">CtrlDeconnection</span>.</p>
                <p>C:\wamp64\www\raptor\packages\login\ressources\js\app.js</p>
                <p><span class="text-primary txt-bold">output.administrateur</span> représente ici la valeur à la sortie du modèle PHP [login.php].</p>
                <div>
                    <pre>
                    <code class="javascript hljs">
                        /*admin représente le nom du coockie que nous avons contruit*/
                        $cookieStore.put('admin', undefined); /*pour vider la valeur du coockie */
                        $cookieStore.put('admin', output.administrateur); /*pour ajouter la valeur du coockie */
                    </code>                
                    </pre>
                </div>
                <p>ET il faut que celui ci soit présent dans le modèle <span class="txt-bold success">login.php</span></p>
                <p>C:\wamp64\www\raptor\packages\login\model\login.php</p>
                <p><span class="text-primary txt-bold">"administrateur" => $administrateur</span> représente la valeur retourné dans le controleur sous la variable <span class="text-warning txt-bold">output.administrateur</span></p>
                <div>
                    <pre>
                        <code class="javascript hljs">
                        $tab_sortie = array("matricule" => $matricule, "password" => $password, "nom" => $nom, "prenoms" => $prenoms, "verification" => TRUE, "administrateur" => $administrateur, "consulter" => $consulter, "ajouter" => $ajouter, "editer" => $editer, "supprimer" => $supprimer);
                        echo json_encode($tab_sortie);
                        </code>
                    </pre>
                </div>
            </div>
        </div>
        <div class="row espacetopbot">
            <div class="col-sm-12">

            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <!-- contenu des configurations Raptor -->
        <h2>Configuration page par défaut selon variable associé</h2>
        <hr/>
        <div class="row">
            <div class="col-sm-12">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>
                                Variable associé
                            </th>
                            <th>
                                URL par défaut
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="var_url in tab_var_url">
                            <td>
                                <input type="text" class="form-control" ng-model="var_url.variable">
                            </td>                            
                            <td>
                                <input type="text" class="form-control" ng-model="var_url.url">
                            </td>                            
                            <td>
                                <button class="btn btn-warning" ng-click="enregistrerDesUrls(var_url)" ng-tooltip="" data-placement="top" title="" data-original-title="Modifier">
                                    <i class="fa fa-save" aria-hidden="true"></i>                 
                                </button> 
                                <button class="btn btn-danger" ng-click="supprimerDesUrls(var_url)" ng-tooltip="" data-placement="top" title="" data-original-title="Supprimer">
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>                
                                </button>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                            </td>                            
                            <td>
                            </td>                            
                            <td>
                            </td>                           
                        </tr>
                        <tr>
                            <td>
                                <input type="text" class="form-control" ng-model="ajout_var_url.variable">
                            </td>                            
                            <td>
                                <input type="text" class="form-control" ng-model="ajout_var_url.url">
                            </td>                            
                            <td>
                                <button class="btn btn-success" ng-click="ajouterDesUrls(ajout_var_url)" ng-tooltip="" data-placement="right" title="" data-original-title="Ajouter">
                                    <i class="fa fa-plus" aria-hidden="true"></i>                 
                                </button> 
                            </td>                           
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>    
<div ng-modalfontawesome=""></div>
<div ng-modalfontawesomemenu=""></div>
<toast></toast>