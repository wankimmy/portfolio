import bpy
import time

def try_start():
    # BlenderMCP addon exposes operators once registered
    for op_id in (
        "blendermcp.start_server",
        "blender_mcp.start_server",
        "mcp.start_server",
    ):
        try:
            mod, name = op_id.split(".", 1)
            op = getattr(getattr(bpy.ops, mod), name, None)
            if op:
                op()
                print("STARTED_OP=" + op_id)
                return
        except Exception as e:
            print("OP_FAIL=" + op_id + ":" + str(e))
    # Fallback: import addon module and start server class if present
    try:
        import blender_mcp_addon as m
        print("ADDON_ATTRS=" + ",".join([a for a in dir(m) if not a.startswith("_")][:40]))
        if hasattr(m, "BlenderMCPServer"):
            host = getattr(m, "DEFAULT_HOST", "localhost")
            port = getattr(m, "DEFAULT_PORT", 9876)
            srv = m.BlenderMCPServer(host=host, port=port)
            srv.start()
            print("SERVER_THREAD_STARTED")
            # keep blender alive is handled by GUI; for bg we sleep
    except Exception as e:
        print("IMPORT_FAIL=" + str(e))

try_start()
