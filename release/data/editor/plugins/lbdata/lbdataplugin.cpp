
/******************************************************************************\
*
* Plugin
*
\******************************************************************************/

/*
 */
string getName() {
	return "LBDataPlugin";
}

/*
 */
void init(PluginMeta meta) {
	
	// plugin initialization callback
	log.message("%s: init(%s): called\n",getName(),meta.name);
	ForInitLBData();
}

void shutdown() {
	
	// plugin shutdown callback
	log.message("%s: shutdown(): called\n",getName());
	ForShutdownLBData();
}

void save() {
	
	// plugin world save callback
	ForSaveLBData();
}

void update(int need_reload) {
	
	// plugin update callback
	ForUpdateLBData();
}

/******************************************************************************\
*
* Node callbacks
*
\******************************************************************************/

/*
 */
void nodeInit() 
{
	InitLBNodeData(::Nodes::nodes, ::Nodes::parameters_tb);
}

void nodeUpdate() 
{
	UpdateLBNodeData(::Nodes::node, ::Nodes::parameters_tb);
}

void nodeShutdown() 
{	
	ShutdownLBNodeData(::Nodes::node, ::Nodes::parameters_tb);
}

void nodesUpdate()
{
}