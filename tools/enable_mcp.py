import bpy
import addon_utils
# Prefer installed addon module name
wanted = ["blender_mcp_addon", "blender_mcp"]
for mod in wanted:
    try:
        addon_utils.enable(mod, default_set=True, persistent=True)
        print("ENABLED=" + mod)
    except Exception as e:
        print("FAIL=" + mod + ":" + str(e))
# List matching
for m in addon_utils.modules():
    name = m.__name__
    if "mcp" in name.lower() or "blender_mcp" in name.lower():
        print("MOD=" + name)
bpy.ops.wm.save_userpref()
print("PREFS_SAVED")
