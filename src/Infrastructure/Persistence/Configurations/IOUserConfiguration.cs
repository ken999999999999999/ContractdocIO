﻿using Microsoft.EntityFrameworkCore;

        builder.HasIndex(t => t.UserName).IsUnique();

    }
}