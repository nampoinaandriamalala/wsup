select 
	gc.id as computers_id,
	gc.name as nom_poste,
	gpfi.remote_addr as remote_addr,
	gl.name as location,	
	gcdp.designation as processeur, 
	gdp.frequency_default as frequenceprocesseur,
	gdm.size_default as memoirevive 

from glpi.glpi_computers as gc
left join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers as gpfi on gpfi.computers_id = gc.id
left join glpi.glpi_locations as gl on gl.id = gc.locations_id
left join glpi.glpi_computers_deviceprocessors as gcdp on gcdp.computers_id = gc.id
left join glpi.glpi_deviceprocessors as gdp on gdp.id =gcdp.deviceprocessors_id
left join glpi.glpi_computers_devicememories as gcdm on gcdm.computers_id = gc.id
left join glpi.glpi_devicememories as gdm on gdp.id =gcdm.devicememories_id

select 
	gc.id as computers_id,
	gc.name as nom_poste,
	gpfi.remote_addr as remote_addr,
	gl.name as location,	
	gcdp.designation as processeur, 
	gdp.frequency_default as frequenceprocesseur,
	gdm.size_default as memoirevive 

from glpi.glpi_computers as gc
left join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers as gpfi on gpfi.computers_id = gc.id
left join glpi.glpi_locations as gl on gl.id = gc.locations_id
inner join glpi.glpi_computers_items as gci on gci.computers_id = gc.id
left join glpi.glpi_computers_deviceprocessors as gcdp on gcdp.computers_id = gc.id
left join glpi.glpi_items_deviceprocessors as gdp on gdp.id =gcdp.deviceprocessors_id
left join glpi.glpi_computers_devicememories as gcdm on gcdm.computers_id = gc.id
left join glpi.glpi_items_devicememories as gidm on gidm.id = gci.items_id


select 
	gc.id as computers_id,
	gc.name as nom_poste,
	gpfi.remote_addr as remote_addr,
	gl.name as location,
	-- gcdp.designation as processeur, 
--	gdp.frequency_default as frequenceprocesseur,
	gdm.size as memoirevive 

from glpi.glpi_computers as gc
inner join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers as gpfi on gpfi.computers_id = gc.id
inner join glpi.glpi_locations as gl on gl.id = gc.locations_id
inner join glpi.glpi_computers_items as gci on gci.computers_id = gc.id
inner join glpi.glpi_items_devicememories as gdm on gci.items_id =gdm.id

SELECT
	gdm.size_default as memoirevive,
	gcdm.computers_id as computers
FROM glpi.glpi_devicememories as gdm 
INNER JOIN glpi.glpi_computers_devicememories as gcdm on gcdm.devicememories_id = gdm.id
INNER JOIN glpi.glpi_computers as gc on gc.id = gcdm.computers_id
WHERE gcdm.computers_id = 3178

RELATION to various table, according to itemtype (ID)

select 
	gc.id as computers_id,
	gc.name as nom_poste,
	gpfi.remote_addr as remote_addr,
	gl.name as location
	-- gcdp.designation as processeur, 
--	gdp.frequency_default as frequenceprocesseur,
	-- gdm.size_default as memoirevive 

from glpi.glpi_computers as gc
left join glpi.glpi_plugin_fusioninventory_inventorycomputercomputers as gpfi on gpfi.computers_id = gc.id
left join glpi.glpi_locations as gl on gl.id = gc.locations_id
left join glpi.glpi_computers_items as gci on gci.computers_id = gc.id
left join glpi.glpi_devicememories as gdm on gci.items_id =gdm.id


-- statistiques

