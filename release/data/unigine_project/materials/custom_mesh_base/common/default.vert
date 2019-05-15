/* Copyright (C) 2005-2017, UNIGINE Corp. All rights reserved.
 *
 * This file is a part of the UNIGINE 2.6.1.1 SDK.
 *
 * Your use and / or redistribution of this software in source and / or
 * binary form, with or without modification, is subject to: (i) your
 * ongoing acceptance of and compliance with the terms and conditions of
 * the UNIGINE License Agreement; and (ii) your inclusion of this notice
 * in any version of this software that you use or redistribute.
 * A copy of the UNIGINE License Agreement is available by contacting
 * UNIGINE Corp. at http://unigine.com/
 */

#include <core/shaders/mesh/common/common.h>
#include <unigine_project/materials/custom_mesh_base/common/vertex.h>

STRUCT(FRAGMENT_IN)
	INIT_POSITION
END

MAIN_BEGIN_VERTEX(FRAGMENT_IN)
	#include <unigine_project/materials/custom_mesh_base/common/vertex.h>
MAIN_END
