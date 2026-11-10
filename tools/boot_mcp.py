import bpy

def _start():
    try:
        bpy.ops.blendermcp.start_server()
        print("MCP_SERVER_STARTED")
    except Exception as e:
        print("MCP_START_ERR=" + str(e))
    return None

bpy.app.timers.register(_start, first_interval=1.0)
