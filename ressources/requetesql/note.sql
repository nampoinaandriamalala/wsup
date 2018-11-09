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

select gt.id,
		gt.name,
		gt.date,
		gt.status,
		gt.requesttypes_id,
		gt.content,
		gt.priority,
		gt.type,
		gr.name as typedemnde
from glpi_tickets as gt
inner join glpi_requesttypes as gr on gr.id=gt.requesttypes_id
order by gt.date

-- order by date desc limit 20

select * from glpi_tickets,
gr.name as typedemnde
inner join glpi_requesttypes as gr on gr.id=glpi_tickets.requesttypes_id
order by gt.date



select DISTINCT
	gc.id as id_poste,
	gl.name as location,
	'' as plan_id,
	gc.name as nom_poste,
	gc.contact as possesseur,
	gc.contact as ip,
	gpficc.remote_addr as ip_adress,
	gdsc.designation as devicesoundcards_designation,
	gidsc.devicesoundcards_id as devicesoundcards_id
	

from glpi_computers as gc

inner join glpi_plugin_fusioninventory_inventorycomputercomputers as gpficc on gpficc.computers_id = gc.id 

left join glpi.glpi_locations as gl on gl.id = gc.locations_id

inner join glpi_items_deviceprocessors as gidp on gidp.items_id = gc.id
inner join glpi_deviceprocessors as gdp on gdp.id = gidp.deviceprocessors_id

inner join glpi_items_devicememories as gidm on gidm.items_id = gc.id
inner join glpi_devicememories as gdm on gdm.id = gidm.devicememories_id

inner join glpi_items_devicegraphiccards as gidgc on gidgc.items_id = gc.id
inner join glpi_devicegraphiccards as gdgc on gdgc.id = gidgc.devicegraphiccards_id

inner join glpi_items_devicenetworkcards as gidnc on gidnc.items_id = gc.id
inner join glpi_devicenetworkcards as gdnc on gdnc.id = gidnc.devicenetworkcards_id

inner join glpi_items_devicesoundcards as gidsc on gidsc.items_id = gc.id
inner join glpi_devicesoundcards as gdsc on gdsc.id = gidsc.devicesoundcards_id

inner join glpi_items_deviceharddrives as gidhd on gidhd.items_id = gc.id
inner join glpi_deviceharddrives as gdhd on gdhd.id = gidhd.deviceharddrives_id

where  
	gc.name='0994-UC'